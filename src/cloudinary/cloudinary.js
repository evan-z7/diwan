import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dhcvqsdvh', 
  api_key: '284349833312649', 
  api_secret: 'Enu6FgIC6sNgljgU9Nnm_NsJqas' 
});

const uploadStream = (fileStream, name) => {
  // wrapping into promise for using modern async/await
  return new Promise((resolve, reject) => {        
    cloudinary.uploader.upload_stream({ public_id: name }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }).end(fileStream);
  });
};

export const uploadImage = async (fileStream, fileName) => {
  const result = await uploadStream(fileStream, fileName);
  return result;
};
