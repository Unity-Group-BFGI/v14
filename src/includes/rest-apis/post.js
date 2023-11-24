import $ from 'jquery';
const postRequest = (endpoint, headers, data) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: endpoint,
            headers:headers,
            method: 'POST',
            data: data,
            cache: false,
            beforeSend: function(){},
            success: function(res){ resolve(res); },   
            error: function(err){
                const { responseJSON, status } = err; 
                if( responseJSON && status !== 0 ) {
                    reject({ ...responseJSON });
                } else {
                    reject({ 
                        success: false, 
                        has_json: false,
                        json: {},

                        error: true,
                        error_type: 'error',
                        error_message: "Couldn't connect to the API, Connection refused",        
                        error_code: 'net::ERR_CONNECTION_REFUSED',
                        show_error_modal: true
                    }); 
                }
                
            }
        });
    });
};

export default postRequest;