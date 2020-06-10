using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Serialization;
using Corrigo.Marketplace.Api.Models;

namespace Corrigo.Marketplace.Api.Services
{
	public class ActionsService
	{
		private readonly string actionsPath = Path.Combine(Directory.GetCurrentDirectory(), "ActionsStore"); 
		public IEnumerable<Metadata> GetActionsMetadata()
		{
			foreach (var directory in Directory.EnumerateDirectories(actionsPath))
			{
				var file = Directory.GetFiles(directory, "*.cmspec")
					.FirstOrDefault();

				using var fileStream = File.Open(file, FileMode.Open);
				var serializer = new XmlSerializer(typeof(Package));
				var package = (Package)serializer.Deserialize(fileStream);
				yield return new Metadata
				{
					Description = package.Metadata.Description,
					Id = package.Metadata.Id,
					Version = package.Metadata.Version,
					LogoPath =
						$"/ActionsStore/{package.Metadata.Id}." +
						$"{package.Metadata.Version}/" +
						$"{package.Metadata.LogoPath}",
					StepsPath = $"/ActionsStore/{package.Metadata.Id}." + 
						$"{package.Metadata.Version}/ui/steps"
				};
			}
		}
	}
}