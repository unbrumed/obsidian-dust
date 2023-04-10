nginx .htpasswd

Adding user:
```
sudo sh -c "echo -n 'usernamee:' >> /etc/nginx/.htpasswd"
```
```
sudo sh -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"
```