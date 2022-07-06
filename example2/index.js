import { Parser as SparqlParser, Generator as SparqlGenerator } from "sparqljs";
const SparqlClient = require("sparql-http-client");
// https://uedayou.net/ldapinavi/linkdata/rdf1s8600i/OpenworksMNP
const endpointUrl =
"https://uedayou.net/ldapinavi/api/rdf1s8600i/OpenworksMNP/sparql";

(async () => {

  const parser = new SparqlParser();
  const parsedQuery = parser.parse(
    `
    PREFIX rdf1s8600i: <http://linkdata.org/resource/rdf1s8600i#>
    PREFIX iclt: <https://imilite.org/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX cc: <http://creativecommons.org/ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX schema: <http://schema.org/>
    PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    select * where{
    ?uri rdfs:label ?label;
    iclt:名称 ?名称;
    iclt:郵便番号 ?郵便番号;
    iclt:住所 ?住所;
    geo:lat ?lat;
    geo:long ?long;
    iclt:備考 ?備考.
    }limit 10
    `
  );

  // Regenerate a SPARQL query from a JSON object
  const generator = new SparqlGenerator({sparqlStar: true,baseIRI:""});
  const generatedQuery = generator.stringify(parsedQuery);
  const client = new SparqlClient({ endpointUrl });
  const stream = await client.query.select(generatedQuery);

  stream.on("data", (row) => {
    Object.entries(row).forEach(([key, value]) => {
      console.log(`${key}: ${value.value} (${value.termType})`)
    })
  });

  stream.on("error", (err) => {
    console.error(err);
  });
})();

// $ node -r esm index.js
