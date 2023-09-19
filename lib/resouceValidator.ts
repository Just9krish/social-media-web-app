import { ZodSchema, ZodIssue } from 'zod';

// Define a custom error class for validation errors
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Define a function for data validation
export default function validateData<T>(schema: ZodSchema<T>, data: any): T {
  try {
    // Attempt to parse the data using the provided schema
    const result = schema.safeParse(data);

    // Check if the data is valid
    if (result.success) {
      // Return the parsed data
      return result.data;
    } else {
      // Data is invalid, construct a detailed validation error message

      const errorMessages = result.error.issues.map((issue: ZodIssue) => {
        if (issue.code === 'invalid_type') {
          return `Field '${issue.path.join(
            '.',
          )}' has an invalid type, expected to be ${issue.expected}`;
        } else {
          return `Field '${issue.path.join('.')}' is invalid: ${issue.message}`;
        }
      });

      throw new ValidationError(
        `Data validation failed: ${errorMessages.join(', ')}`,
      );
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error; // Re-throw the validation error
    } else {
      throw new Error('An unexpected error occurred during validation');
    }
  }
}
