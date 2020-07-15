using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using System.Security.Claims;
using System;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using DatingApp.API.Helpers;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IDatingRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var CurrentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            userParams.UserId = CurrentUserId;

            var userFromRepo = await _repo.GetUser(CurrentUserId);

            // if (string.IsNullOrEmpty(userParams.Gender))
            // {
            //     userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            // }

            var users = await _repo.GetUsers(userParams);
            var UserToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(UserToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var UserToReturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(UserToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");

        }

        [HttpPost("{id}/like/{recipientid}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(id);
            var recipient = await _repo.GetUser(recipientId);

            var like = await _repo.GetLikes(id, recipientId);

            if (like != null)
            {
                return BadRequest("You already liked this user");
            }


            if (await _repo.GetUser(recipientId) == null)
            {
                return NotFound();
            }

            like = new Likes
            {
                LikeeId = recipientId,
                LikerId = id,
            };

            _repo.Add<Likes>(like);

            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("Failed to like user");
        }

    }
}