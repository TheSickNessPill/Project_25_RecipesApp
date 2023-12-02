from django.urls import path
from recipes.views import(
    recipes_list, dishes_list, dish_info
)

urlpatterns = [
    path("", recipes_list),
    path("categories/", dishes_list),
    path("dishinfo/", dish_info)
]