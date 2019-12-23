import Base from './Base'

class System extends Base{
    redirect(params,config){
        return this.post('/home/redirect',params,config)
    }
    validate(params,config){
        return this.post('/home/validate',params,config)
    }
    login(params,config){
        return this.post('/home/login',params,config)
    }
    login1(params,config){
        return this.post('/home/login1',params,config)
    }
    getCode(params,config){
        return this.post('/home/getCode',params,config)
    }
    login2(params,config){
        return this.post('/home/login2',params,config)
    }
    logout(params,config){
        return this.post('/home/logout', params,config)
    }
    functionData(params,config){
        return this.post('/home/functionData', params,config)
    }
    getFrontMenus(params,config){
        return this.post('/home/getFrontMenus', params,config)
    }
    organizations(params,config){
        return this.post('/home/organizations', params,config)
    }
    getOrgId(params,config){
        return this.post('/home/getOrgId', params,config)
    }
}

export default System