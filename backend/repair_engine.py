from typing import Dict, Any, List

class RepairEngine:
    @staticmethod
    def repair(specification: Dict[str, Any], issues: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Repairs specific sections of the specification in-place.
        Returns a log of repairs performed.
        """
        repairs_performed = []

        for issue in issues:
            category = issue.get("category")
            detail = issue.get("issue")
            stage = issue.get("stage")

            if category == "Auth ↔ API Inconsistency":
                # Detail format: API endpoint 'X' requires role 'Y' which is not defined in Auth Schema roles
                # Strategy: Add role 'Y' to Auth Schema roles
                try:
                    # Parse out the missing role
                    parts = detail.split("role '")
                    if len(parts) > 1:
                        missing_role = parts[1].split("'")[0]
                        auth_schema = specification.get("auth_schema", {})
                        roles_list = auth_schema.get("roles", [])
                        
                        # Add role if not present
                        role_exists = any(r["name"] == missing_role for r in roles_list)
                        if not role_exists:
                            default_permissions = ["read_public", "read_own_profile"]
                            if missing_role == "member":
                                default_permissions.extend(["create_booking", "process_payments"])
                            elif missing_role == "client":
                                default_permissions.extend(["process_payments", "read_invoices"])
                            
                            roles_list.append({
                                "name": missing_role,
                                "permissions": default_permissions
                            })
                            
                            repairs_performed.append({
                                "issue": detail,
                                "repair_strategy": f"Inject missing role '{missing_role}' into Auth Schema roles with default scope permissions.",
                                "result": f"Successfully updated auth_schema.roles to include '{missing_role}' role configuration."
                            })
                except Exception as e:
                    repairs_performed.append({
                        "issue": detail,
                        "repair_strategy": "Attempt fallback programmatic repair on Auth roles",
                        "result": f"Skipped or failed: {str(e)}"
                    })

            elif category == "UI ↔ API Mismatch":
                # Detail format: UI component 'X' on page 'Y' references undefined API path 'Z'
                # Strategy: Add missing API endpoint to API Schema with default settings
                try:
                    parts = detail.split("path '")
                    if len(parts) > 1:
                        missing_path = parts[1].split("'")[0]
                        api_schema = specification.get("api_schema", {})
                        endpoints = api_schema.get("endpoints", [])
                        
                        # Check if endpoint already exists
                        ep_exists = any(ep["path"] == missing_path for ep in endpoints)
                        if not ep_exists:
                            # Parse standard method based on path name
                            method = "POST" if "create" in missing_path or "booking" in missing_path or "payment" in missing_path else "GET"
                            endpoints.append({
                                "path": missing_path,
                                "method": method,
                                "request_schema": {},
                                "response_schema": {"status": "string"},
                                "auth_required": True,
                                "roles": ["user"]
                            })
                            
                            repairs_performed.append({
                                "issue": detail,
                                "repair_strategy": f"Synthesize missing endpoint route '{method} {missing_path}' in API Schema.",
                                "result": f"Successfully updated api_schema.endpoints to expose route '{missing_path}'."
                            })
                except Exception as e:
                    repairs_performed.append({
                        "issue": detail,
                        "repair_strategy": "Attempt fallback programmatic repair on API endpoints",
                        "result": f"Skipped or failed: {str(e)}"
                    })

        return repairs_performed
