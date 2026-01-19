import logging
import os
from logging.handlers import RotatingFileHandler

if not os.path.exists('backend/logs'):
    os.makedirs('backend/logs')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        RotatingFileHandler('backend/logs/app.log', maxBytes=5000000, backupCount=3),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)