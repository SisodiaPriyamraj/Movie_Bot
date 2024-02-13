from aiohttp import ClientSession
from bs4 import BeautifulSoup

async def fetch(url, session):
    async with session.get(url) as response:
        return await response.text()

async def scrape_website(url):
    try:
        async with ClientSession() as session:
            html = await fetch(url, session)
            soup = BeautifulSoup(html, 'html.parser')

            data = soup.text
            return data
    except Exception as e:
        return e


class WebSite:
    def __init__(self, url, searchurl, searchelement, searchTitle, searchLink, downloadtitles, downloadlinks):
        self.url = url
        self.searchurl = searchurl
        self.searchelement = searchelement
        self.searchTitle = searchTitle
        self.searchLink = searchLink
        self.downloadtitles = downloadtitles
        self.downloadlinks = downloadlinks

    async def search(self, query):
        async with ClientSession() as session:
            try:
                html = await fetch(self.searchurl + query.replace(" ", "+"), session)
                soup = BeautifulSoup(html, 'html.parser')

                data = []
                rawdata = soup.find_all(*self.searchelement)
                for element in rawdata[:5]:
                    search = {}
                    search["link"] = element.find(*self.searchLink).get("href")
                    search["title"] = element.find(*self.searchTitle).text

                    data.append(search)

                return data

            except Exception as e:
                return [f"{e}"]



