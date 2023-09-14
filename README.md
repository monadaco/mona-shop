# EKS Config Tips

## How to add additional IAM users to EKS cluster permissions auth configmap

1. Download the configmap
```sh
kubectl get configmap aws-auth -n kube-system -o yaml > aws-auth-configmap.yaml
```
2. Edit the configmap and add the new user to the mapUsers section
```yaml
mapUsers: |
    - userarn: arn:aws:iam::634996749830:user/tsuf
      username: tsuf
```
3. Apply the configmap
```sh
kubectl apply -f aws-auth-configmap.yaml
```
4. Verify the user was added
```sh
kubectl describe configmap aws-auth -n kube-system
```

## How to set up RBAC on the cluster

edit `eks-cluster/rbac-config.yaml` and add the users you want to add to the cluster

then apply the changes with `kubectl apply -f eks-cluster/rbac-config.yaml`