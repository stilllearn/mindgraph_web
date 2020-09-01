const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  permission_routes: state => state.permission.routes,
  // isStudent:state => {
  //   let canRoles = ["学生"];
  //   return state.user.roles.some(role => canRoles.includes(role));
  // },
  permissions: state => state.user.permissions
}
export default getters
