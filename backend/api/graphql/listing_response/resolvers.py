from apps.listing.models import Listing
from apps.listing_response.models import ListingResponse

def resolve_responses_by_listing_id(root, info, id):
    return Listing.objects.get(pk=id).listingresponse_set.all()