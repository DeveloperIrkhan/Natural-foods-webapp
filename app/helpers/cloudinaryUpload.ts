import { v2 as cloudinary } from "cloudinary";
interface iCloudinaryUploads {
  url: string; // This is the crucial one for your error
  secure_url: string;
  // Add other properties you might use
}

//we will upload the file to server and then to cloudinary
// and unlink the file  from server after upload to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// const uploadOnCloudinary = async (localFilePath: any) => {
//   try {
//     console.log("localFilePath",localFilePath);
//     if (!localFilePath) return null;
//     // uploading file on  cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto"
//     });
//     //console.log("file uploaded on cloundinary", response.url);
//     //file had uploaded successfully  on cloudinary then delete from server
//     if (fs.existsSync(localFilePath) && fs.lstatSync(localFilePath).isFile()) {
//       fs.unlinkSync(localFilePath); // Remove the file from the server
//       console.log("File removed from server");
//     } else {
//       console.log("File not found, nothing to delete");
//     }
//     return response;
//   } catch (error) {
//     console.error("Error during Cloudinary upload or file deletion:", error);
//     return null;
//   }
// };
const uploadOnCloudinary = async (
  imageBuffer: Buffer,
  originalFileName?: string
): Promise<iCloudinaryUploads | null> => {
  try {
    if (!imageBuffer) return null;

    // Optional: Extract file extension and base name if you want to use them for public_id
    const baseName = originalFileName
      ? originalFileName.split(".")[0].replace(/\s+/g, "-")
      : `upload-${Date.now()}`;
    const publicId = `${baseName}-${Date.now()}`; // Generate a unique public_id

    // Uploading the buffer to Cloudinary
    // Cloudinary's uploader.upload method can directly accept a buffer
    // when you prefix it with 'data:image/jpeg;base64,' for example.
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            public_id: publicId
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result as iCloudinaryUploads);
            }
          }
        )
        .end(imageBuffer);
    });
  } catch (error) {
    console.error("Error during Cloudinary upload:", error);
    return null;
  }
};

export { uploadOnCloudinary };
