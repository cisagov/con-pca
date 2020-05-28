"""
Subscription Serializers.

These are Django Rest Framework Serializers. These are used for
serializing data coming from the db into a request response.
"""
# Third-Party Libraries
from rest_framework import serializers

from api.serializers.customer_serializers import CustomerContactSerializer


class SubscriptionTargetSerializer(serializers.Serializer):
    """
    This is the Target Serializer.

    This is a formats the data coming out of the Db.
    """

    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    position = serializers.CharField(max_length=100)
    email = serializers.EmailField()


class SubscriptionClicksSerializer(serializers.Serializer):
    """
    This is the SubscriptionClicks Serializer.

    This is a formats the data coming out of the Db.
    """

    source_ip = serializers.CharField(max_length=100)
    timestamp = serializers.DateTimeField()
    target_uuid = serializers.UUIDField()


class GoPhishResultSerializer(serializers.Serializer):
    """
    This is the GoPhishResult Serializer.

    This is a formats the data coming out of the Db.
    """

    id = serializers.CharField()
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    position = serializers.CharField()
    status = serializers.CharField(max_length=255)
    ip = serializers.CharField()
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    send_date = serializers.DateTimeField(required=False)
    reported = serializers.BooleanField(required=False)


class GoPhishGroupSerializer(serializers.Serializer):
    """
    This is the GoPhishGroup Serializer.

    This is a formats the data coming out of the Db.
    """

    id = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=255)
    targets = SubscriptionTargetSerializer(many=True)
    modified_date = serializers.DateTimeField()


class GoPhishTimelineSerializer(serializers.Serializer):
    """
    This is the GoPhishTimeline Serializer.

    This is a formats the data coming out of the Db.
    """

    email = serializers.EmailField(required=False)
    time = serializers.DateTimeField()
    message = serializers.CharField(max_length=255)
    details = serializers.CharField(required=False)


class GoPhishCampaignsSerializer(serializers.Serializer):
    """
    This is the GoPhishCampaigns Serializer.

    This is a formats the data coming out of the Db.
    """

    campaign_id = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=100)
    created_date = serializers.DateTimeField()
    launch_date = serializers.DateTimeField()
    send_by_date = serializers.DateTimeField(required=False)
    completed_date = serializers.DateTimeField(required=False)
    email_template = serializers.CharField(required=False)
    landing_page_template = serializers.CharField(required=False)
    status = serializers.CharField(max_length=255)
    results = GoPhishResultSerializer(many=True)
    groups = GoPhishGroupSerializer(many=True)
    timeline = GoPhishTimelineSerializer(many=True)
    target_email_list = SubscriptionTargetSerializer(many=True, required=False)

# class GoPhishTemplateSerializer(serializers.Serializer):
#     """
#     This is the GoPhish Temaplates Serializer.

#     This is a formats the data coming out of the Db.
#     """
#     template_id = serializers.IntegerField(required=False)
    


class SubscriptionGetSerializer(serializers.Serializer):
    """
    This is the Subscription Serializer.

    This is a formats the data coming out of the Db.
    """

    # created by mongodb
    subscription_uuid = serializers.UUIDField()
    # values being passed in.
    customer_uuid = serializers.UUIDField()
    name = serializers.CharField(required=True, max_length=100)
    url = serializers.CharField(required=True, max_length=100)
    keywords = serializers.CharField(max_length=100)
    start_date = serializers.DateTimeField()
    gophish_campaign_list = GoPhishCampaignsSerializer(many=True)
    primary_contact = CustomerContactSerializer()
    status = serializers.CharField(max_length=100)
    target_email_list = SubscriptionTargetSerializer(many=True)
    templates_selected_uuid_list = serializers.ListField(required=False)
    active = serializers.BooleanField()
    archived = serializers.BooleanField(default=False)
    manually_stopped = serializers.BooleanField(default=False)
    # db data tracking added below
    created_by = serializers.CharField(max_length=100)
    cb_timestamp = serializers.DateTimeField()
    last_updated_by = serializers.CharField(max_length=100)
    lub_timestamp = serializers.DateTimeField()


class SubscriptionPostSerializer(serializers.Serializer):
    """
    This is the Subscription Post Request Serializer.

    This is a formats the data coming out of the Db.
    """

    customer_uuid = serializers.UUIDField()
    name = serializers.CharField(required=True, max_length=100)
    url = serializers.CharField(required=True, max_length=100)
    keywords = serializers.CharField(max_length=100)
    start_date = serializers.DateTimeField()
    gophish_campaign_list = GoPhishCampaignsSerializer(many=True)
    primary_contact = CustomerContactSerializer()
    status = serializers.CharField(max_length=100)
    target_email_list = SubscriptionTargetSerializer(many=True)
    templates_selected_uuid_list = serializers.ListField()
    active = serializers.BooleanField()
    archived = serializers.BooleanField(default=False)
    manually_stopped = serializers.BooleanField(default=False)


class SubscriptionPostResponseSerializer(serializers.Serializer):
    """
    This is the Subscription Post Response Serializer.

    This is a formats the data coming out of the Db.
    """

    subscription_uuid = serializers.UUIDField()


class SubscriptionPatchSerializer(serializers.Serializer):
    """
    This is the Subscription PATCH Request Serializer.

    This is a formats the data coming out of the Db.
    """

    customer_uuid = serializers.UUIDField(required=False)
    name = serializers.CharField(required=False, max_length=100)
    url = serializers.CharField(required=False, max_length=100)
    keywords = serializers.CharField(max_length=100)
    start_date = serializers.DateTimeField(required=False)
    gophish_campaign_list = GoPhishCampaignsSerializer(many=True, required=False)
    primary_contact = CustomerContactSerializer(required=False)
    status = serializers.CharField(max_length=100, required=False)
    target_email_list = SubscriptionTargetSerializer(many=True, required=False)
    templates_selected_uuid_list = serializers.ListField(required=False)
    active = serializers.BooleanField(required=False)
    archived = serializers.BooleanField(default=False)
    manually_stopped = serializers.BooleanField(default=False)


class SubscriptionPatchResponseSerializer(serializers.Serializer):
    """
    This is the Subscription PATCH Response Serializer.

    This is a formats the data coming out of the Db.
    """

    customer_uuid = serializers.UUIDField()
    name = serializers.CharField(required=True, max_length=100)
    url = serializers.CharField(required=False, max_length=100)
    keywords = serializers.CharField(max_length=100)
    start_date = serializers.DateTimeField()
    gophish_campaign_list = GoPhishCampaignsSerializer(many=True)
    primary_contact = CustomerContactSerializer()
    status = serializers.CharField(max_length=100)
    target_email_list = SubscriptionTargetSerializer(many=True)
    templates_selected_uuid_list = serializers.ListField(required=False)
    active = serializers.BooleanField()
    archived = serializers.BooleanField(default=False)
    manually_stopped = serializers.BooleanField(default=False)
    created_by = serializers.CharField(max_length=100)
    cb_timestamp = serializers.DateTimeField()
    last_updated_by = serializers.CharField(max_length=100)
    lub_timestamp = serializers.DateTimeField()


class SubscriptionDeleteResponseSerializer(serializers.Serializer):
    """
    This is the Subscription DELETE Response Serializer.

    This is a formats the data coming out of the Db.
    """

    subscription_uuid = serializers.UUIDField()
