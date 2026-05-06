import Service from '../models/Service.js';
import {uploadToCloudinary, deleteFromCloudinary} from '../utils/cloudinary.js';

// Helper function to handle image upload
// so this function converts array like input into a clean array when empty or invalid it will return an empty array.

const parseJsonArrayField = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "string") {
    try {
      const parsed = JSON.parse(field);
      if (Array.isArray(parsed)) return parsed;
      return typeof parsed === "string" ? [parsed] : [];
    } catch {
      return field
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  return [];
};

// so this function takes date-time slot string and group them into a YY/MM/DD with the time 
function normalizeSlotsToMap(slotStrings = []) {
  const map = {};
  slotStrings.forEach((raw) => {
    const m = raw.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})\s*•\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) {
      // fallback: keep raw in an "unspecified" bucket
      map["unspecified"] = map["unspecified"] || [];
      map["unspecified"].push(raw);
      return;
    }
    const [, day, monShort, year, hour, minute, ampm] = m;
    const monthIdx = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      .findIndex(x => x.toLowerCase() === monShort.toLowerCase());
    const mm = String(monthIdx + 1).padStart(2, "0");
    const dd = String(Number(day)).padStart(2, "0");
    const dateKey = `${year}-${mm}-${dd}`; // YYYY-MM-DD
    const timeStr = `${String(Number(hour)).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${ampm.toUpperCase()}`;
    map[dateKey] = map[dateKey] || [];
    map[dateKey].push(timeStr);
  });
  return map;
}
// 🔥 AUTO SLOT GENERATOR
const generateSlots = () => {
  const slots = {};

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const formattedDate = date.toISOString().split("T")[0];

    slots[formattedDate] = [
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "02:00 PM",
      "03:00 PM"
    ];
  }

  return slots;
};

// safely convert anythging into number
const sanitizePrice = (v) => Number(String(v ?? "0").replace(/[^\d.-]/g, "")) || 0;
const parseAvailability = (v) => {
  const s = String(v ?? "available").toLowerCase();
  return s === "available" || s === "true";
};

// To create a service

export async function createService(req, res) {
try {
  const b = req.body || {};
    const instructions = parseJsonArrayField(b.instructions);
    const rawSlots = parseJsonArrayField(b.slots);
    const slots = normalizeSlotsToMap(rawSlots);
    const numericPrice = sanitizePrice(b.price);
    const available = parseAvailability(b.availability);

    let imageUrl = null;
    let imagePublicId = null;
    if (req.file) {
      try {
        const up = await uploadToCloudinary(req.file.path, "services");
        imageUrl = up?.secure_url || null;
        imagePublicId = up?.public_id || null;
      } catch (err) {
        console.error("Cloudinary upload error:", err);
      }
    } 
    // if the file is present it will be uploaded to services folder in the cloudinary

    const services = new Service({
      name: b.name,
      about: b.about || "",
      shortDescription: b.shortDescription || "",
      price: numericPrice,
      available,
      instructions,
      slots,
      imageUrl,
      imagePublicId
    });
    const saved = await services.save();
    return res.status(201).json({
      success: true,
      data: saved,
      message: "Service created successfully"
    });
} 
catch (err) {
  console.error("Create service error:", err);
  return res.status(500).json({
    success: false,
    message: "Server error occurred"
  })  
}
}

// to get all the services
export async function getServices(req, res) {
  try {
    const list = await Service.find().sort({createdAt: -1}).lean();
    return res.json({
      success: true,
      data: list 
    })
  } 
  catch (err) {
  console.error("Get services error:", err);
  return res.status(500).json({
    success: false,
    message: "Server error occurred"
  })  
}
}

// to get service by id
export async function getServiceById(req, res) {
  try {
    const { id } = req.params;

    const service = await Service.findById(id).lean();

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    // 🔥 AUTO GENERATE SLOTS
    const dynamicSlots = generateSlots();

    return res.status(200).json({
      success: true,
      data: {
        ...service,
        slots: dynamicSlots   // 👈 THIS IS THE KEY LINE
      }
    });

  } catch (err) {
    console.error("GetServiceById error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error occurred"
    });
  }
}

// to update a particular service
export async function updateService(req, res)  {
  try {
    const {id} = req.params;
    const existing = await Service.findById(id);
    if (!existing) return res.status(404).json({
      success: false,
      message: "Service not found"
    });

    const b = req.body || {};
    const updateData = {};

    // to update a each field if already present then update them
     if (b.name !== undefined) updateData.name = b.name;
    if (b.about !== undefined) updateData.about = b.about;
    if (b.shortDescription !== undefined) updateData.shortDescription = b.shortDescription;
    if (b.price !== undefined) updateData.price = sanitizePrice(b.price);
    if (b.availability !== undefined) updateData.available = parseAvailability(b.availability);
    if (b.instructions !== undefined) updateData.instructions = parseJsonArrayField(b.instructions);
    if (b.slots !== undefined) updateData.slots = normalizeSlotsToMap(parseJsonArrayField(b.slots));
// if the file is present it will be uploaded to services folder in the cloudinary and if the existing image is present then it will be deleted from the cloudinary
    if (req.file) {
      try {
        const up = await uploadToCloudinary(req.file.path, "services");
        if (up?.secure_url) {
          updateData.imageUrl = up.secure_url;
          updateData.imagePublicId = up.public_id || null;
          if (existing.imagePublicId) {
            try {
              await deleteFromCloudinary(existing.imagePublicId);
            } catch (err) {
              console.warn("Cloudinary delete failed:", err?.message || err);
            }
          }
        }
      } catch (err) {
        console.error("Cloudinary upload error:", err);
      }
    }

    const updated = await Service.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
      });

    return res.status(200).json({
      success: true,
        data: updated,
        message: "Service updated successfully"
      });
  } 
  catch (err) {
  console.error("UpdateService error:", err);
  return res.status(500).json({
    success: false,
    message: "Server error occurred"
  })  
}
}

// to delete a particular service
export async function deleteService(req, res)  {
  try {
    const {id} = req.params;
    const existing = await Service.findById(id);
    if (!existing) return res.status(404).json({
      success: false,
      message: "Service not found"
    });
    if (existing.imagePublicId) {
      try{
        await deleteFromCloudinary(existing.imagePublicId);
      }
     catch (err) {
      console.warn("Cloudinary delete failed:", err?.message || err
      );
    }
  } 
    await existing.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Service deleted successfully"
    });
}
catch(err) {
  console.error("DeleteService error:", err);
  return res.status(500).json({
    success: false,
    message: "Server error occurred"
  });
}
}