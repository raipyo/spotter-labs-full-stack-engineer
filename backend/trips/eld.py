def generate_eld_logs(total_hours, cycle_used):
    MAX_CYCLE = 70
    remaining = MAX_CYCLE - cycle_used

    logs = []

    for hour in range(total_hours):

        if remaining <= 0:
            status = "OFF DUTY - RESET REQUIRED"
        else:
            if hour % 14 < 11:
                status = "DRIVING"
            elif hour % 14 == 11:
                status = "ON DUTY"
            else:
                status = "REST"

        logs.append({
            "hour": hour,
            "day": hour // 24,
            "status": status
        })

        remaining -= 1

    # GROUP INTO DAYS
    daily = {}

    for log in logs:
        day = log["day"]

        if day not in daily:
            daily[day] = []

        daily[day].append(log)

    return daily