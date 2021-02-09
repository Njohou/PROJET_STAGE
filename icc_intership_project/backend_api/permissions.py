from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_superuser:
            return True
        return False


class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_staff:
            return True
        return False


class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.is_active and not request.user.is_staff:
            return True
        return False
