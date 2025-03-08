const x = (() => {
    const now = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(now.getDate() + 7)

    return [
        {
            "id": "1",
            "name": "Meal plan 1",
            "startDate": now,
            "endDate": nextWeek,
            "mealCount": 5,
            "currentIngredientCount": 4,
            "totalIngredientCount": 10
        },
        {
            "id": "2",
            "name": "Meal plan 2",
            "startDate": now,
            "endDate": nextWeek,
            "mealCount": 3,
            "currentIngredientCount": 0,
            "totalIngredientCount": 1
        },
        {
            "id": "3",
            "name": "Meal plan 3",
            "startDate": now,
            "endDate": nextWeek,
            "mealCount": 4,
            "currentIngredientCount": 3,
            "totalIngredientCount": 6
        },
        {
            "id": "4",
            "name": "Meal plan 4",
            "startDate": now,
            "endDate": nextWeek,
            "mealCount": 4,
            "currentIngredientCount": 0,
            "totalIngredientCount": 11
        }
    ]
})()

export default x