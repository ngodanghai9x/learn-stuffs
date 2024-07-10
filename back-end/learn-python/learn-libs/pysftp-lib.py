# https://sftptogo.com/blog/python-sftp/

import pysftp
# from pysftp import Connection
from urllib.parse import urlparse
import os


class Sftp:
    def __init__(self, hostname, username, password, port=22):
        """Constructor Method"""
        # Set connection object to None (initial value)
        self.connection = None
        self.hostname = hostname
        self.username = username
        self.password = password
        self.port = port
        print('pysftp', pysftp)
        # cnopts = pysftp.CnOpts()
        # cnopts.hostkeys = None  # Không nên dùng trong môi trường sản xuất vì lý do bảo mật


    def connect(self):
        """Connects to the sftp server and returns the sftp connection object"""

        try:
            # Get the sftp connection object
            self.connection = pysftp.Connection(
                host=self.hostname,
                username=self.username,
                password=self.password,
                port=self.port,
            )
        except Exception as err:
            raise Exception(err)
        finally:
            print(f"Connected to {self.hostname} as {self.username}.")

    def disconnect(self):
        """Closes the sftp connection"""
        self.connection.close()
        print(f"Disconnected from host {self.hostname}")

    def listdir(self, remote_path):
        """lists all the files and directories in the specified path and returns them"""
        for obj in self.connection.listdir(remote_path):
            yield obj

    def listdir_attr(self, remote_path):
        """lists all the files and directories (with their attributes) in the specified path and returns them"""
        for attr in self.connection.listdir_attr(remote_path):
            yield attr

    def download(self, remote_path, target_local_path):
        """
        Downloads the file from remote sftp server to local.
        Also, by default extracts the file to the specified target_local_path
        """

        try:
            print(
                f"downloading from {self.hostname} as {self.username} [(remote path : {remote_path});(local path: {target_local_path})]"
            )

            # Create the target directory if it does not exist
            path, _ = os.path.split(target_local_path)
            if not os.path.isdir(path):
                try:
                    os.makedirs(path)
                except Exception as err:
                    raise Exception(err)

            # Download from remote sftp server to local
            self.connection.get(remote_path, target_local_path)
            print("download completed")

        except Exception as err:
            raise Exception(err)

    def upload(self, source_local_path, remote_path):
        """
        Uploads the source files from local to the sftp server.
        """

        try:
            print(
                f"uploading to {self.hostname} as {self.username} [(remote path: {remote_path});(source local path: {source_local_path})]"
            )

            # Download file from SFTP
            self.connection.put(source_local_path, remote_path)
            print("upload completed")

        except Exception as err:
            raise Exception(err)


if __name__ == "__main__":
    # sftp_url = os.environ.get("SFTPTOGO_URL")
    sftp_url = 'sftp://user:p@ssw0rd@172.16.10.117:22'
    sftp_url = "sftp://data_training:training123a@!@172.16.10.117:22"

    if not sftp_url:
        print("First, please set environment variable SFTPTOGO_URL and try again.")
        exit(0)

    parsed_url = urlparse(sftp_url)
    print('parsed_url', parsed_url)
    print('hostname', parsed_url.hostname)
    print('username', parsed_url.username)
    print('password', parsed_url.password)

    sftp = Sftp(
        hostname=parsed_url.hostname,
        username=parsed_url.username,
        password=parsed_url.password,
    )

    # Connect to SFTP
    sftp.connect()

    # Lists files with attributes of SFTP
    path = "/"
    print(f"List of files with attributes at location {path}:")
    for file in sftp.listdir_attr(path):
        print(file.filename, file.st_mode, file.st_size, file.st_atime, file.st_mtime)

    # Upload files to SFTP location from local
    local_path = "/Users/saggi/Downloads/tls2.png"
    remote_path = "/tls2.png"
    sftp.upload(local_path, remote_path)

    # Lists files of SFTP location after upload
    print(f"List of files at location {path}:")
    print([f for f in sftp.listdir(path)])

    # Download files from SFTP
    sftp.download(
        remote_path, os.path.join(remote_path, local_path + '.backup')
    )

    # Disconnect from SFTP
    sftp.disconnect()