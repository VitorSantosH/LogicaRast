import api from './api.js';


const connect = {

    getUsers: async (props) => {
        console.log(props)
        const response = await api.get("/getSavedUsers")
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
                return err;
            })

        return response;
    },

    EditUser: async (props) => {

        let retorno = await api.post('/editUser', { ...props }, {
            headers: {},
        })
            .then(retorno => {
                console.log(retorno)
                return retorno;
            })
            .catch(err => {
                return err;
            })

        return retorno;
    }
}


export default connect;