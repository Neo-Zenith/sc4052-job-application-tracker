# Nginx setup

1\. Install nginx

```bash
sudo apt install
```

2\. Navigate to 'etc/nginx/conf.d' directory

```bash
cd ~/etc/nginx/conf.d
```

3\. Create `default.conf` and write the configurations in the file.

```bash
touch default.conf
```

4\. Restart Nginx

```bash
systemctl restart Nginx
```

5\. Check status of Nginx

```bash
systemctl status Nginx
```

