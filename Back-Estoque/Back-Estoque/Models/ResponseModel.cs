using System;

namespace LevApi.Models
{
    public class ResponseModel
    {
        public ResponseModel(int statusCode)
        {
            StatusCode = statusCode;
        }

        public ResponseModel(string message, int statusCode)
        {
            Message = message;
            StatusCode = statusCode;
        }

        public ResponseModel(Object data, int statusCode)
        {
            Data = data;
            StatusCode = statusCode;
        }


        public Object Data { get; set; }
        public string Message { get; set; }
        public int StatusCode { get; set; }
    }
}
