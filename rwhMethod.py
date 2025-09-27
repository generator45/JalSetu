def get_water_harvesting_method(state):
    water_methods = {
        "Kerala": ["Surangam", "Karambu"],
        "Tamil Nadu": ["Eri", "Ooranis"],
        "Karnataka": ["Madakas", "Neeruganti"],
        "Andhra Pradesh": ["Cheruvu"],
        "Maharashtra": ["Phad Irrigation", "Ramtek"],
        "Madhya Pradesh": ["Katas", "Mundas", "Bandhas"],
        "Odisha": ["Katas", "Mundas", "Bandhas"],
        "Gujarat": ["Virdas"],
        "Rajasthan": ["Naada/Bandha", "Johads", "Talabs", "Taankas", "Stepwells/Baoli"],
        "Uttarakhand": ["Naula", "Gul", "Dhara", "Simar", "Khel"],
        "Himachal Pradesh": ["Kul", "Khatri"],
        "Jammu and Kashmir": ["Zing"],
        "Ladakh": ["Zing"],
        "Uttar Pradesh": ["Kunds"],
        "Bihar": ["Ahar", "Pynes"],
        "Bengal": ["Inundation Channels"],
        "Meghalaya": ["Bamboo Drip Irrigation"],
        "Arunachal Pradesh": ["Apatani"],
        "Assam": ["Dongs", "Garh", "Dam"],
        "Nagaland": ["Zabo"],
        "Nicobar": ["Jackwells"]
    }

    # Standardize input
    state = state.strip().title()

    # Return specific method if available, else general method
    if state in water_methods:
        return water_methods[state]
    else:
        return ["Rooftop Rainwater Harvesting", "Check Dams / Percolation Tanks", "Community Ponds / Step Wells"]

# Example usage
state_input = input("Enter Indian state: ")
methods = get_water_harvesting_method(state_input)
print(f"Recommended water harvesting method(s) for {state_input}: {methods}")
