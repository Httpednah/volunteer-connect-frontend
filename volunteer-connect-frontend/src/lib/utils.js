// This utility function helps manage CSS classes in React.
// It combines 'clsx' (for conditional classes) and 'tailwind-merge' (to handle Tailwind conflicts).
// Example: cn("bg-red-500", "p-4", condition && "text-white")
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names and handles Tailwind CSS conflicts.
 * @param {...string} inputs - Class names or conditions.
 * @returns {string} - A single merged string of classes.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
