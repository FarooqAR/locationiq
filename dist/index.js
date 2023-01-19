"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class LocationIq {
    constructor(options) {
        this.region = 'us1';
        this.timeout = 3000;
        this.format = 'json';
        const { region, key, } = options;
        this.key = key;
        if (region === 'eu1')
            this.region = region;
        this.basePath = `https://${this.region}.locationiq.com/v1/`;
        if (!key && key.length === 0) {
            throw new Error('API Token is required');
        }
        this.request = axios_1.default.create({
            timeout: this.timeout,
            baseURL: this.basePath,
        });
        this.request.defaults.params = {
            format: this.format,
            key: this.key,
        };
    }
    search(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {};
                if (typeof searchParams === 'object' && !Array.isArray(searchParams)) {
                    const { street, city, county, state, country, postalcode, viewbox, bounded, addressdetails, limit, acceptLanguage, countrycodes, namedetails, dedupe, polygon_geojson, polygon_kml, polygon_svg, polygon_text, extratags, excludePlaceIds, normalizecity, } = searchParams;
                    if (postalcode && countrycodes) {
                        if (typeof countrycodes !== 'string' || countrycodes.length !== 2) {
                            throw new Error('Invalid country code');
                        }
                        ;
                        params.countrycodes = countrycodes;
                        params.postalcode = postalcode;
                    }
                    else {
                        if (street)
                            params.street = street;
                        if (city)
                            params.city = city;
                        if (county)
                            params.county = county;
                        if (state)
                            params.state = state;
                        if (country)
                            params.country = country;
                        if (postalcode)
                            params.postalcode = postalcode;
                        if (viewbox)
                            params.viewbox = viewbox;
                        if (bounded)
                            params.bounded = bounded;
                        if (addressdetails)
                            params.addressdetails = addressdetails;
                        if (limit)
                            params.limit = limit;
                        if (acceptLanguage)
                            params.acceptLanguage = acceptLanguage;
                        if (namedetails)
                            params.namedetails = namedetails;
                        if (dedupe)
                            params.dedupe = dedupe;
                        if (polygon_geojson)
                            params.polygon_geojson = polygon_geojson;
                        if (polygon_kml)
                            params.polygon_kml = polygon_kml;
                        if (polygon_svg)
                            params.polygon_svg = polygon_svg;
                        if (polygon_text)
                            params.polygon_text = polygon_text;
                        if (extratags)
                            params.extratags = extratags;
                        if (excludePlaceIds)
                            params.excludePlaceIds = excludePlaceIds;
                        if (normalizecity)
                            params.normalizecity = normalizecity;
                    }
                }
                else {
                    if (typeof searchParams !== 'string' || searchParams.length === 0) {
                        throw new Error('Please provide a valid search string');
                    }
                    params.q = searchParams;
                }
                ;
                const queryResponse = yield this.request.get('search.php', {
                    params,
                });
                const response = {
                    status: 200,
                    results: queryResponse.data || [],
                    total: queryResponse.data.length || 0,
                };
                return response;
            }
            catch (error) {
                const response = {
                    status: error.status || 400,
                    error: error.message || error,
                };
                return response;
            }
        });
    }
    reverse(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { lat, lon, zoom, addressdetails, namedetails, acceptLanguage, osm_type, osm_id, countrycodes, polygon_geojson, polygon_kml, polygon_svg, polygon_text, extratags, normalizecity, statecode, } = options;
                if (!lat)
                    throw new Error('lat parameter is requried');
                if (!lon)
                    throw new Error('lat parameter is requried');
                const params = {
                    lat,
                    lon,
                };
                if (zoom)
                    params.zoom = zoom;
                if (addressdetails)
                    params.addressdetails = addressdetails;
                if (namedetails)
                    params.namedetails = namedetails;
                if (acceptLanguage)
                    params.acceptLanguage = acceptLanguage;
                if (osm_type)
                    params.osm_type = osm_type;
                if (osm_id)
                    params.osm_id = osm_id;
                if (countrycodes)
                    params.countrycodes = countrycodes;
                if (polygon_geojson)
                    params.polygon_geojson = polygon_geojson;
                if (polygon_kml)
                    params.polygon_kml = polygon_kml;
                if (polygon_svg)
                    params.polygon_svg = polygon_svg;
                if (polygon_text)
                    params.polygon_text = polygon_text;
                if (extratags)
                    params.extratags = extratags;
                if (normalizecity)
                    params.normalizecity = normalizecity;
                if (statecode)
                    params.statecode = statecode;
                const queryResponse = yield this.request.get('reverse.php', {
                    params,
                });
                const response = {
                    status: 200,
                    results: queryResponse.data,
                    total: queryResponse.data.length || 0,
                };
                return response;
            }
            catch (error) {
                const response = {
                    status: error.status || 400,
                    error: error.message || error,
                };
                return response;
            }
        });
    }
}
exports.LocationIq = LocationIq;
//# sourceMappingURL=index.js.map