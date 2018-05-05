using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;
using ExpediaWOffers.Models;
using Newtonsoft.Json;

namespace ExpediaWOffers.Services
{
    public class ExpediaService
    {
        public static async Task<object> GetOffers(SearchCriteria criteria)
        {
            string path = "https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel";

            var builder = new UriBuilder(path);
            dynamic offers = new { };
            var query = HttpUtility.ParseQueryString(builder.Query);

            var queryParams = ResolveQueryStrings(criteria, path);

            builder.Query = queryParams;
            string url = builder.ToString();

            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(url);
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = await httpClient.GetStringAsync(new Uri(url));
                dynamic jsonResponse = JsonConvert.DeserializeObject(response);
               
                 offers = jsonResponse.offers;

                return offers;
            }

        }
        public class DealsDTO
        {
            public string shortName { get; set; }
        }
        private static string ResolveQueryStrings(SearchCriteria criteria, string path)
        {
            var builder = new UriBuilder(path);
            var query = HttpUtility.ParseQueryString(builder.Query);

            List<PropertyInfo> properties = new List<PropertyInfo>(criteria.GetType().GetProperties());
            foreach (PropertyInfo prop in properties)
            {
                var value = prop.GetValue(criteria);
                if (value != null)
                {
                    var propertyType = prop.PropertyType;
                    if (propertyType.IsGenericType
&& propertyType.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
                    {
                        propertyType = new NullableConverter(prop.PropertyType).UnderlyingType;
                    }

                    var typeCode = Type.GetTypeCode(propertyType);
                    if (typeCode != TypeCode.DateTime)
                    {
                        query[prop.Name] = value.ToString();
                    }
                    else
                    {
                        query[prop.Name] = Convert.ToDateTime(value).ToString("yyyy-MM-dd");
                    }
                }
            }
            var queryParams = query.ToString();
            queryParams = queryParams.Replace("minTripStartDate", "minTripStartDate:");
            queryParams = queryParams.Replace("maxTripStartDate", "maxTripStartDate:");

            return queryParams;
        }
    }
}
