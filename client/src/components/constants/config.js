////////////////////////// API'S  ERROR MESSAGES //////////////////////

export const API_NOTIFICATION_MESSAGES ={
    responseFailure:{
       title: 'error',
       message: 'An error occured while fetching response from the server. Please try again later'
    },
    requestFailure:{
        title: 'error',
        message: 'An error ocurred while parsing request data'
    },
    networkError:{
        title: 'error',
        message: 'unable to connect with server. Please check internet connectivity'
    }
}

/////////////////////// API URLS //////////////////
export const SERVICE_URLS = {
    userSignup: {url: '/signup', method: 'POST'},
    verifyEmail:{url: '/emailVerify', method: 'POST'},
    userLogin: {url: '/login', method: 'POST'},
    postBmi:{url:'/myBmi', method: 'POST'},
    useAuth:{url: '/useAuth', method: 'GET'}
    
}