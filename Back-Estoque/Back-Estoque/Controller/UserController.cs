using Back_Estoque.Data;
using Back_Estoque.Models;
using Back_Estoque.Service;
using LevApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Back_Estoque.Controllers
{
    [Authorize("Bearer")]
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext db;
        private readonly UserService _userService;
        private readonly UserManager<UserModel> _userManager;
        private readonly SignInManager<UserModel> _signManager;


        public IConfiguration configuration { get; }

        public UserController(IConfiguration Configuration, AppDbContext context, UserManager<UserModel> userManager,
            SignInManager<UserModel> signinManager, UserService userService)
        {

            configuration = Configuration;
            db = context;
            _userService = userService;
            _signManager = signinManager;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("token")]
        public async Task<IActionResult> GetToken([FromBody] UserModel usr)
        {
            try
            {
                GetTokenModel response = await _userService.GetToken(usr);
                if (response.StatusCode == 200)
                {
                    return Ok(response);
                }
                else
                {
                    return Unauthorized(response);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [Route("list")]
        public IActionResult List()
        {
            try
            {
                return Ok(_userService.ListUsers());
            }
            catch (System.Exception)
            {
                return StatusCode(500, "Ocorreu um erro");
            }
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserModel usr)
        {
            RegisterModel retModel = await _userService.Register(usr);
            object retObj = new { message = retModel.Message };
            switch (retModel.StatusCode)
            {
                case 200:
                    return Ok(retObj);
                case 500:
                    return StatusCode(500, retObj);
                case 422:
                    return UnprocessableEntity(retObj);
                case 409:
                    return Conflict(retObj);
            }
            return null;
        }

       





    }
}

