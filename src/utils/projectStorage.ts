import { CourseProject } from '../types/golf';
import { createNewCourseProject } from './projectFactory';

export const STORAGE_KEY_PROJECTS = 'pga2k25_course_projects';
export const STORAGE_KEY_ACTIVE_ID = 'pga2k25_active_project_id';

/**
 * Loads course projects from localStorage.
 * If none exist or storage is empty, initializes with a single clean blank course project
 * (no seed/mock course data).
 */
export function loadProjectsFromStorage(): CourseProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to parse saved projects from localStorage:', err);
  }

  // Clean slate: start with a fresh blank project, without any seed course data
  const initialProject = createNewCourseProject({
    name: 'My Course 1',
    subtitle: '18-Hole Championship Layout',
    style: 'Championship',
    environmentTheme: 'boreal',
    holesCount: 18,
    locationName: 'Custom Location'
  });

  saveProjectsToStorage([initialProject]);
  saveActiveProjectId(initialProject.id);
  return [initialProject];
}

/**
 * Persists course projects to localStorage.
 */
export function saveProjectsToStorage(projects: CourseProject[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    return true;
  } catch (err) {
    console.error('Failed to save projects to localStorage:', err);
    return false;
  }
}

/**
 * Loads the active project ID from localStorage.
 */
export function loadActiveProjectId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
  } catch (err) {
    console.error('Failed to load active project ID from localStorage:', err);
    return null;
  }
}

/**
 * Persists the active project ID to localStorage.
 */
export function saveActiveProjectId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVE_ID, id);
  } catch (err) {
    console.error('Failed to save active project ID to localStorage:', err);
  }
}
