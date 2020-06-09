using System.Collections.Generic;
using Corrigo.Marketplace.Api.Models;
using Corrigo.Marketplace.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Corrigo.Marketplace.Api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ActionsController : ControllerBase
	{
		private readonly ActionsService actionsService;

		public ActionsController(ActionsService actionsService)
		{
			this.actionsService = actionsService;
		}

		[HttpGet]
		public IEnumerable<Metadata> Get()
		{
			return actionsService.GetPackagesMetadata();
		}
	}
}