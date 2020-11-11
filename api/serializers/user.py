from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Profile
from api.serializers import TarjetaReadSerializer


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'profile',
            'password'
        )

class UserSingleReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        )

class ProfileReadSerializer(serializers.ModelSerializer):

    user = UserSingleReadSerializer(read_only=True)
    tarjetas = TarjetaReadSerializer(read_only=True, many=True)

    class Meta:
        model = Profile
        fields = "__all__"


class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileReadSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        )

