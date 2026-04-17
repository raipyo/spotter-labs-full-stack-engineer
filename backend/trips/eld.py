def generate_eld_logs(total_hours, cycle_used):
    MAX_CYCLE = 70
    remaining = MAX_CYCLE - cycle_used

    logs = []

    for hour in range(total_hours):
        if remaining <= 0:
            logs.append({
                "hour": hour,
                "status": "OFF DUTY - RESET REQUIRED"
            })
            continue

        # DOT-style 11-hour driving rule simulation
        if hour % 14 < 11:
            status = "DRIVING"
        elif hour % 14 == 11:
            status = "ON DUTY (LOADING)"
        else:
            status = "SLEEPER / REST"

        logs.append({
            "hour": hour,
            "status": status
        })

        remaining -= 1

    return logs