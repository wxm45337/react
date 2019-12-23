
interface UserInfo{
    userCode?: string,
    userPwd?: string 
}

class UserLogin{
    info: UserInfo = {};
    constructor(props?: any){
        console.log('-UserLogin----init-----')
    }
    setUserInfo(info: UserInfo ){
        this.info = info;
    }
}

export default new UserLogin()