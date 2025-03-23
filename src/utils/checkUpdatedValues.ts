export function checkUpdatedValue(data: any, selectedUser: any) {
  if (!selectedUser) return;

  const updatedFields: Record<string, any> = {};

  Object.entries(data).forEach(([key, value]) => {
    const originalValue = selectedUser[key as keyof typeof selectedUser];
    console.log("original value", originalValue);
    // Convert both to strings for safer comparison (or handle dates, numbers separately if needed)
    if (value !== undefined && String(value) !== String(originalValue)) {
      updatedFields[key] = value;
    } else {
      updatedFields[key] = null;
    }
  });

  // If there are changed fields, move to next step
  if (Object.keys(updatedFields).length > 0) {
    return updatedFields;
  }
  return null;
}
