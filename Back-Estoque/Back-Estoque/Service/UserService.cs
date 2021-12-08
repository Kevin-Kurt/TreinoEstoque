using Back_Estoque.Data;
using Back_Estoque.Models;
using LevApi.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Data;
using System.IO;
using Back_Estoque.Utils.Interfaces;

namespace Back_Estoque.Service
{
    public class UserService
    {
        public IConfiguration configuration { get; }
        private readonly AppDbContext db;
        private readonly UserManager<UserModel> _userManager;
        private readonly IViewRenderService _viewRenderService;
        private readonly SignInManager<UserModel> _signManager;

        public UserService(UserManager<UserModel> userManager, AppDbContext context, SignInManager<UserModel> signinManager, IViewRenderService viewRenderService, IConfiguration Configuration)
        {
            configuration = Configuration;
            _userManager = userManager;
            db = context;
            _viewRenderService = viewRenderService;
            _signManager = signinManager;
        }

        public List<UserModel> ListUsers()
        {
            return db.Users.ToList();
        }

        public async Task<RegisterModel> Register(UserModel usr)
        {
            try
            {
                UserModel findUser = db.Users.Where(x => x.Name == usr.Name).FirstOrDefault();


                if (findUser == null)
                {
                    if (usr.UserName == null)
                    {
                        usr.UserName = usr.Name;
                    }

                    usr.UserType = Utils.Enums.eUserType.Master;
                    var result = await _userManager.CreateAsync(usr, usr.Password);

                    if (result.Succeeded)
                    {
                        return new RegisterModel("", 200);
                    }
                    else
                    {
                        return new RegisterModel("Erro ao acessar o banco de dados", 422);
                    }
                }
                else
                {
                    return new RegisterModel("Usuário já existe", 409);
                }
            }
            catch (Exception e)
            {
                db.Remove(db.Users.Where(x => x.Name == usr.Name).FirstOrDefault());
                await db.SaveChangesAsync();
                throw e;
            }
        }


        public SecurityToken GenerateTokenUserName(UserModel user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration.GetSection("TokenAuthentication")["SecretKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.UserName),
                    new Claim(ClaimTypes.Authentication, user.Id)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = configuration.GetSection("TokenAuthentication")["Issuer"],
                Audience = configuration.GetSection("TokenAuthentication")["Audience"]
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return token;
        }


        public async Task<GetTokenModel> GetToken(UserModel usr)
        {
            UserModel findUser = db.Users.Where(x => x.Email == usr.Email).FirstOrDefault();
            if (findUser != null)
            {
                var result = await _signManager.PasswordSignInAsync(findUser, usr.Password, false, lockoutOnFailure: true);
                if (result.Succeeded)
                {

                    UserModel user = db.Users.Where(x => x.Email == findUser.Email).AsNoTracking().FirstOrDefault();
                    findUser = user;

                    var token = GenerateTokenUserName(findUser);
                    UserModel retUser = null;


                    retUser = db.Users.Where(x => x.Id == findUser.Id)
                    .Select(x => new UserModel()
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Email = x.Email,
                        PhoneNumber = x.PhoneNumber,
                        UserType = x.UserType,
                    })
                    .FirstOrDefault();

                    return new GetTokenModel(
                        new JwtSecurityTokenHandler().WriteToken(token),
                        retUser,
                        token.ValidTo,
                        200
                    );
                }
                else
                {
                    return new GetTokenModel("Usuario ou Senha incorretos", 401);
                }
            }
            else
            {
                return new GetTokenModel("Usuario ou Senha incorretos", 401);
            }

        }


    }
    
}
