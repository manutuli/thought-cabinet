export function authAdminUser(role) {
    // const roles = ["user", "admin"]
    // const auth = storage.getItem("token") ? "admin" : "user"
    const permissions = {
        play: false,
        crud: false,
    }
    switch (role) {
        case "user" : {
            return { ...permissions, play: true}
        }
        case "admin" : {
            return { ...permissions, play: true, crud: true}
        }
    }
    // 
    return console.error("role is not admin nor user !");
    
}