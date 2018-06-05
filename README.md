### This repository is web client of Slide analysis project. To run this project follow the instructions.
## Instructions:
1. Install os requirements
    ```
    sudo apt-get install git python3 nodejs npm python3-pip openslide-tools libsm6 libxext6 python3-tk
    ```

2. Clone projects
    ```
    git clone https://github.com/Vozf/slide_analysis_web.git
    git clone https://github.com/Vozf/slide_analysis_api.git
    ```
3. Update `slide_analysis_api.slide_analysis_api.constants.py` and set `SLIDE_DIR` to path of your directory with images
4. Run web client
    ```
    cd slide_analysis_web
    npm i
    npm start
    ```
5. Run api
    ```
    cd slide_analysis_api
    pip3 install -r requirements.txt
    python3 run.py
    ```

## Screenshots
![](https://psv4.userapi.com/c848324/u98389977/docs/d6/de6821eeedf2/Screenshot_from_2018-06-05_16-53-40.png?extra=_S6rG8-JFaAzT8uRdCOololcSjt0DBuaZLbcGh-uZs5fOejkD593uf-vsIL6VRhQiXwtA183yoibheqvDxiGpsTtiF488sX2Aoz0Ku9-VaqiXgv8G3qeP7XWp3vS6Nf2Qvvjegd_Ow)
![](https://psv4.userapi.com/c848324/u98389977/docs/d10/704970796529/Screenshot_from_2018-06-05_17-00-20.png?extra=06Z4SAJUUFeuSXl3Zey0PvlEC186NqtcjjJIPMwdlt4zrFrbFWFRXM1P7ItwUZ6wepAobKDkXiYx3hcl0XLeWBKtO4bbQVRTyr9HqRFljQHgT5HBE7rzX36-xASQpFUXGl_AHD-GEg)
