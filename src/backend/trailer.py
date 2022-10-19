from pathlib import Path

import googleapiclient.discovery
import googleapiclient.errors

from database.database import movie_basic_info_query

scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]
api_service_name = "youtube"
api_version = "v3"

youtube = googleapiclient.discovery.build(api_service_name, api_version,
                                          developerKey=Path('YouTube_API_key').read_text())


def get_trailer(mid: int, embed=True):
    movie_info = movie_basic_info_query(mid)
    name = movie_info[1]
    year = movie_info[3]
    search_string = ''
    if year:
        search_string = f'{name} {year} trailer'
    else:
        search_string = f'{name} trailer'

    request = youtube.search().list(
        part="snippet",
        maxResults=1,
        q=search_string,
    )
    response = request.execute()
    video_id = response['items'][0]['id']['videoId']
    if embed:
        embed_element = f'<iframe width="560" height="315" src="https://www.youtube.com/embed/{video_id}" title="YouTube ' \
                        f'video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; ' \
                        f'encrypted-media; ' \
                        f'gyroscope; picture-in-picture" allowfullscreen></iframe> '
        return embed_element
    else:
        return video_id
