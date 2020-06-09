using System.ComponentModel;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace Corrigo.Marketplace.Api.Models
{
	[XmlRoot("package", Namespace = "http://schemas.corrigo.com/packaging/2020/03/cmspec.xsd")]
	public class Package
	{
		[XmlElement(ElementName = "metadata")]

		[JsonPropertyName("ActionModel")]
		public Metadata Metadata { get; set; }
	}

	public class Metadata
	{
		[XmlElement(ElementName = "id")]
		public string Id { get; set; }

		[XmlElement(ElementName = "version")]
		public string Version { get; set; }

		[XmlElement(ElementName = "description")]
		public string Description { get; set; }

		[XmlElement(ElementName = "logoPath")]
		public string LogoPath { get; set; }

		[XmlIgnore]
		public string StepsPath { get; set; }
	}
}