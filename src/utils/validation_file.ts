// Định nghĩa type cho phản hồi của hàm validation
export type FileValidationResponse = {
  isValid: boolean;
  error?: string;
};

// Hàm để validate file upload
export function validateFile(file: File): FileValidationResponse {
  const validTypes = ["image/jpeg", "image/png"];
  const maxSize = 8 * 1024 * 1024; // 8MB

  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid file type. Only JPG and PNG formats are supported.",
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "File is too large. Maximum size allowed is 8MB.",
    };
  }

  return { isValid: true };
}
