import { ERole } from "../../interface/global.interface"

/**
 *
 * @param allowedRoles List of allowed role
 * @param currentRole current user role
 */
export const hasPermssion = (allowedRoles: ERole[], currentRole: ERole) => {
  return allowedRoles.includes(currentRole)
}
