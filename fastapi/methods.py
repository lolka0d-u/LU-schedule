import requests

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC



def configure_driver(chrome_path="/usr/bin/chromium", driver_path="/usr/bin/chromedriver"):
    options = Options()
    options.binary_location = chrome_path
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox" )

    service = Service(driver_path)
    return webdriver.Chrome(service=service, options=options)


def login_and_gen_cookies(username, password) -> dict:
    url = "https://estudijas.lu.lv/login/index.php?lang=en"
    driver = configure_driver()
    driver.get(url)

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "username")))

    driver.find_element(By.NAME, "username").send_keys(username)
    password_ = driver.find_element(By.NAME, "password")
    password_.send_keys(password)
    password_.submit()

    WebDriverWait(driver, 10).until(lambda d: len(d.get_cookies()) > 0)

    if driver.current_url == "https://estudijas.lu.lv/my/":
        print("Login successful!")
        cookies = {cookie['name']: cookie['value'] for cookie in driver.get_cookies()}
        cookies["ok"] = True
    else:
        print("Login failed!")
        cookies = {"ok": False, "status": "bad credentials"}
    driver.quit()
    return cookies


def fetch_page(url, cookies):
    with requests.Session() as session:
        session.cookies.update(cookies)
        response = session.get(url)

        if response.ok:
            return {"ok": True, "page": response.text}

        return {"ok": False, "status_code": response.status_code}

