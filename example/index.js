(async () => {
  const SparqlClient = require("sparql-http-client");

  // https://uedayou.net/ldapinavi/linkdata/rdf1s8600i/OpenworksMNP
  const endpointUrl =
    "https://uedayou.net/ldapinavi/api/rdf1s8600i/OpenworksMNP/sparql";

  const query = `
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
`;

  const client = new SparqlClient({ endpointUrl });
  const stream = await client.query.select(query);

  stream.on("data", (row) => {
    Object.entries(row).forEach(([key, value]) => {
      console.log(`${key}: ${value.value} (${value.termType})`)
    })
  });

  stream.on("error", (err) => {
    console.error(err);
  });
})();

// $ node index.js
// label: 1 (Literal)
// lat: 35.452736 (Literal)
// long: 139.60445 (Literal)
// uri: http://linkdata.org/resource/rdf1s8600i#1 (NamedNode)
// 住所: 神奈川県横浜市保土ケ谷区西久保町1-8 (Literal)
// 備考: ベンチでノマド可能 (Literal)
// 名称: 西久保町公園 (Literal)
// 郵便番号: 240-0022 (Literal)
// label: 10 (Literal)
// lat: 35.454502 (Literal)
// long: 139.58492 (Literal)
// uri: http://linkdata.org/resource/rdf1s8600i#10 (NamedNode)
// 住所: 神奈川県横浜市保土ケ谷区花見台4-2 (Literal)
// 備考: ベンチでノマド可能 (Literal)
// 名称: 神奈川県立保土ケ谷公園 (Literal)
// 郵便番号: 240-0017 (Literal)
// label: 11 (Literal)
// lat: 35.469883 (Literal)
// long: 139.62318 (Literal)
// uri: http://linkdata.org/resource/rdf1s8600i#11 (NamedNode)
// 住所: 神奈川県横浜市神奈川区台町11-19 (Literal)
// 備考: ベンチでノマド可能 (Literal)
// 名称: 鶴屋町公園 (Literal)
// 郵便番号: 221-0834 (Literal)
// label: 12 (Literal)
// lat: 33.935482 (Literal)
// long: 131.27777 (Literal)
// uri: http://linkdata.org/resource/rdf1s8600i#12 (NamedNode)
// 住所: 山口県宇部市沖宇部6-9 (Literal)
// 備考: パーゴラでノマド可能 (Literal)
// 名称: ふれあい公園 (Literal)
// 郵便番号: 755-0001 (Literal)
// label: 13 (Literal)
// lat: 34.39425 (Literal)
// long: 132.46588 (Literal)
// uri: http://linkdata.org/resource/rdf1s8600i#13 (NamedNode)
// 住所: 広島県広島市中区幟町11 (Literal)
// 備考: ベンチでノマド可能 (Literal)
// 名称: 幟町公園 (Literal)
// 郵便番号: 730-0016 (Literal)
// label: 14 (Literal)
// lat: 37.399624 (Literal)
// long: 140.37915 (Literal)
// uri: http://linkdata.org/resource/rdf1s8600i#14 (NamedNode)
// 住所: 福島県郡山市虎丸町20-229 (Literal)
// 備考: パーゴラでノマド可能 (Literal)
// 名称: 芳山公園 (Literal)
// 郵便番号: 963-8014 (Literal)
// label: 15 (Literal)
// lat: 41.760674 (Literal)
// long: 140.72131 (Literal)
// uri: http://linkdata.org/resource/rdf1s8600i#15 (NamedNode)
// 住所: 北海道函館市宝来町20 (Literal)
// 備考: ベンチでノマド可能 (Literal)
// 名称: 宝来幼児公園 (Literal)
// 郵便番号: 040-0043 (Literal)
// label: 16 (Literal)
// lat: 35.51 (Literal)
// long: 139.67722 (Literal)
// uri: http://linkdata.org/resource/rdf1s8600i#16 (NamedNode)
// 住所: 神奈川県横浜市鶴見区鶴見中央1-12 (Literal)
// 備考: ベンチでノマド可能 (Literal)
// 名称: 東口駅前通り公園 (Literal)
// 郵便番号: 230-0051 (Literal)
// label: 17 (Literal)
// lat: 34.650867 (Literal)
// long: 135.53506 (Literal)
// uri: http://linkdata.org/resource/rdf1s8600i#17 (NamedNode)
// 住所: 大阪府大阪市生野区生野東３丁目１０−９ (Literal)
// 備考: ベンチでノマド可能 (Literal)
// 名称: 生野東公園 (Literal)
// 郵便番号: 544-0025 (Literal)
// label: 2 (Literal)
// lat: 35.451355 (Literal)
// long: 139.60971 (Literal)
// uri: http://linkdata.org/resource/rdf1s8600i#2 (NamedNode)
// 住所: 神奈川県横浜市西区久保町14 (Literal)
// 備考: ベンチでノマド可能 (Literal)
// 名称: 久保町公園 (Literal)
// 郵便番号: 220-0061 (Literal)