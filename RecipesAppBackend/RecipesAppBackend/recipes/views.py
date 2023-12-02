import base64


from django.shortcuts import render
from django.http import JsonResponse, HttpRequest
from recipes.models import Categories, Dish, Media


def recipes_list(request: HttpRequest):
    if request.method == "GET":
        categories = list(Categories.objects.all().values_list("category", flat=True))
        print(categories)
        return JsonResponse({
            "categories": categories
        })


def dishes_list(request: HttpRequest):
    if request.method == "GET":
        category = request.GET.get("category")
        if category:
            category_id = Categories.objects.filter(category=category).values_list("id", flat=True)[0]
            dishes = list(Dish.objects.filter(category_id=category_id).values_list("name", flat=True))
            print(dishes)
            return JsonResponse({
                "dishes": {
                    category: dishes
                }
            })

    return JsonResponse({
        "error": "Invalid data"
    })


def dish_info(request: HttpRequest):
    if request.method == "GET":
        print("DISH")

        dishname = request.GET.get("dishname")
        if dishname:
            dish = Dish.objects.filter(name=dishname).values()[0]
            dishmedia = Media.objects.filter(dish=dish.get("id")).values()[0]
            dishmedia.update({"blob": base64.b64encode(dishmedia.get("blob")).decode("utf-8")})
            dish.update(dishmedia)

            print(dish.keys())
            return JsonResponse({dishname: dish})

    return JsonResponse({
        "error": "Invalid data"
    })