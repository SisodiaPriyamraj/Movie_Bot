import scraper
from aiohttp import ClientSession
from bs4 import BeautifulSoup

# def __init__(self, url, searchurl, searchelement, searchTitle, searchLink, downloadtitles, downloadlinks):
# url, searchurl, searchelement, searchTitle, searchLink, downloadlinks
class hdmovies4u_boo(scraper.WebSite):
    def __init__(self):
        super().__init__(
            "https://hdmovies4u.boo/",
            "https://hdmovies4u.boo/?s=",
            ("div", {'class': "gridxw gridxe"}),
            ("a", {'class': "text-white text-base font-semibold mb-2 hover:text-blue-500"}),
            ("a", {'class': "text-white text-base font-semibold mb-2 hover:text-blue-500"}),
            ("main", {'class': "page-body prose"}),
            ("main", {'class': "page-body prose"}),
        )
    async def download(self, html):
            try:
                soup = BeautifulSoup(html, 'html.parser')

                data = []
                rawdata = soup.find(*self.downloadlinks)
                
                links = rawdata.find_all("a")

                for i in range(len(links)):
                    search = {}
                    search["title"] = links[i].text
                    search["link"] = links[i].get("href")
                    data.append(search)
                return data

            except Exception as e:
                return [f"{e}"]



class mkvcinemas_foo(scraper.WebSite):
    def __init__(self):
        super().__init__(
            "https://mkvcinemas.foo/",
            "https://mkvcinemas.foo/?s=",
            ("div", {"class": "ml-item"}),
            ("span", {"class": "mli-info"}),
            ("a"),
            ("div", {"class": "desc"}),
            ("a", {"class": "button"})
        )

    async def download(self, html):
            try:
                soup = BeautifulSoup(html, 'html.parser')

                data = []
                rawdata = soup.find(*self.downloadtitles)
                links = rawdata.find_all(*self.downloadlinks)

                for i in range(len(links)):
                    search = {}
                    search["title"] = links[i].text
                    search["link"] = links[i].get("href")
                    data.append(search)
                return data

            except Exception as e:
                return [f"{e}"]

class moviesmod_dev(scraper.WebSite):
    def __init__(self):
        super().__init__(
            "https://moviesmod.dev/",
            "https://moviesmod.dev/search/",
            ("article", {"class": "latestPost excerpt"}),
            ("h2", {"class": "title front-view-title"}),
            ("a"),
            ("div", {"class": "thecontent clearfix"}),
            ("div", {"class": "thecontent clearfix"}),
        )

    async def download(self, html):
            try:
                soup = BeautifulSoup(html, 'html.parser')

                data = []
                rawdata = soup.find(*self.downloadlinks)
                
                links = rawdata.find_all("a", {"class": "maxbutton-1 maxbutton maxbutton-download-links"})
                title = rawdata.find_all("p", {"style": "text-align: center;"})

                for i in range(len(links)):
                    search = {}
                    try:
                        search["title"] = title[i].text
                    except:
                        search["title"] = "None"
                    search["link"] = links[i].get("href")
                    data.append(search)
                return data

            except Exception as e:
                return [f"{e}"]

