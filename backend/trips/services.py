import requests
import math

MAPBOX_TOKEN = "pk.eyJ1IjoicmFpcHlvIiwiYSI6ImNtbzJ5czQ1aDB6aGsycHB5dmdjcmhyZGwifQ.pdCXogzJY6bHpwzF4sjnYQ"

def get_route(origin, destination):
    url = f"https://api.mapbox.com/directions/v5/mapbox/driving/{origin};{destination}"

    res = requests.get(url, params={
        "access_token": MAPBOX_TOKEN,
        "geometries": "geojson",
        "overview": "full"
    })

    data = res.json()

    # 🔥 DEBUG SAFETY (IMPORTANT)
    if "routes" not in data:
        raise Exception(f"Mapbox error: {data}")

    route = data["routes"][0]

    return {
        "distance_miles": route["distance"] * 0.000621371,
        "duration_hours": route["duration"] / 3600,
        "geometry": route["geometry"]
    }

def geocode(place):
    url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{place}.json"

    res = requests.get(url, params={
        "access_token": MAPBOX_TOKEN
    })

    data = res.json()

    if "features" not in data or len(data["features"]) == 0:
        raise Exception(f"Geocoding failed for: {place}")

    coords = data["features"][0]["center"]
    return f"{coords[0]},{coords[1]}"