from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import get_route, geocode
from .eld import generate_eld_logs
import math

@api_view(['POST'])
def plan_trip(request):
    data = request.data

    origin = geocode(data["current_location"])
    pickup = geocode(data["pickup_location"])
    dropoff = geocode(data["dropoff_location"])

    cycle_used = float(data["cycle_used"])

    route1 = get_route(origin, pickup)
    route2 = get_route(pickup, dropoff)

    total_hours = math.ceil(
        route1["duration_hours"] + route2["duration_hours"]
    )

    eld_logs = generate_eld_logs(total_hours, cycle_used)

    return Response({
        "route": {
            "to_pickup": route1,
            "to_dropoff": route2
        },
        "eld_logs": eld_logs
    })