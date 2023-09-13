import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { Vpc } from "@cdktf/provider-aws/lib/vpc";
import { Subnet } from "@cdktf/provider-aws/lib/subnet";
import { InternetGateway } from "@cdktf/provider-aws/lib/internet-gateway";
import { Eip } from "@cdktf/provider-aws/lib/eip";
import { RouteTable } from "@cdktf/provider-aws/lib/route-table";
import { RouteTableAssociation } from "@cdktf/provider-aws/lib/route-table-association";
import { NatGateway } from "@cdktf/provider-aws/lib/nat-gateway";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { eksCluster as EKS, eksNodeGroup as NodeGroup } from "@cdktf/provider-aws";
import * as aws from "@cdktf/provider-aws/lib/";


class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "aws", {});

    let identifier = "hasan-demo-cluster";

    let vpc = new Vpc(this, "VPC", {
      cidrBlock: "10.0.0.0/16",
      enableDnsHostnames: true,
      enableDnsSupport: true,
      tags: {
        Name: `${identifier}-vpc`,
      },
    });

    const publicSubnet = new Subnet(this, "PublicSubnet", {
      vpcId: vpc.id,
      cidrBlock: "10.0.0.0/24", // 10.0.0.0 - 10.0.0.255
      tags: {
        Name: `${identifier}-public-subnet-1`,
      },
      mapPublicIpOnLaunch: true,
    });

    // Create the private subnet
    const privateSubnet = new Subnet(this, "PrivateSubnet", {
      vpcId: vpc.id,
      cidrBlock: "10.0.4.0/22", // 10.0.4.0 - 10.0.7.255
      tags: {
        Name: `${identifier}-private-subnet-1`,
      },
      availabilityZone: "us-east-1a",
    });

    const privateSubnet2 = new Subnet(this, "PrivateSubnet2", {
      vpcId: vpc.id,
      cidrBlock: "10.0.8.0/22",
      tags: {
        Name: `${identifier}-private-subnet-1`,
      },
      availabilityZone: "us-east-1b",
    });

    // Create the internet gateway
    const internetGateway = new InternetGateway(this, "InternetGateway", {
      vpcId: vpc.id,
      tags: {
        Name: `${identifier}-internet-gateway`,
      },
    });

    // Create NAT gateway and Elastic IP for NAT
    const eip = new Eip(this, "EIP", {});
    const nat = new NatGateway(this, "NATGateway", {
      allocationId: eip.id,
      subnetId: publicSubnet.id,
      tags: {
        Name: `${identifier}-nat-gateway`,
      },
    });

    // Create route tables for public and private subnets
    const publicRouteTable = new RouteTable(this, "PublicRouteTable", {
      vpcId: vpc.id,
      route: [
        {
          // This will route all traffic to the internet gateway
          cidrBlock: "0.0.0.0/0",
          gatewayId: internetGateway.id,
        },
      ],
      tags: {
        Name: `${identifier}-public-route-table-1`,
      },
    });

    const privateRouteTable = new RouteTable(this, "PrivateRouteTable", {
      vpcId: vpc.id,
      route: [
        {
          // This will route all traffic to the NAT gateway
          cidrBlock: "0.0.0.0/0",
          natGatewayId: nat.id,
        },
      ],
      tags: {
        Name: `${identifier}-private-route-table-1`,
      },
    });

    // Associate route tables with subnets
    new RouteTableAssociation(this, "PublicRouteTableAssociation", {
      subnetId: publicSubnet.id,
      routeTableId: publicRouteTable.id,
    });

    new RouteTableAssociation(this, "PrivateRouteTableAssociation", {
      subnetId: privateSubnet.id,
      routeTableId: privateRouteTable.id,
    });

    new RouteTableAssociation(this, "PrivateRouteTableAssociation2", {
      subnetId: privateSubnet2.id,
      routeTableId: privateRouteTable.id,
    });

    let cluster = new EKS.EksCluster(this, "eks-cluster", {
      name: "hasan-demo-cluster",
      version: "1.27",
      vpcConfig: {
        subnetIds: [privateSubnet.id, privateSubnet2.id, publicSubnet.id],
      },
      roleArn: "arn:aws:iam::634996749830:role/eksClusterRole",
    });

    let nodeRole = new aws.iamRole.IamRole(this, "eks-node-role", {
      assumeRolePolicy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Action: "sts:AssumeRole",
            Principal: {
              Service: "ec2.amazonaws.com",
            },
            Effect: "Allow",
          }
        ]
      }),
      managedPolicyArns: [
        "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
        "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy",
        "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
        "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
      ]
    });

    new NodeGroup.EksNodeGroup(this, "eks-node-group", {
      clusterName: cluster.name,
      nodeRoleArn: nodeRole.arn,
      subnetIds: [privateSubnet.id, privateSubnet2.id, publicSubnet.id],
      scalingConfig: {
        desiredSize: 2,
        maxSize: 3,
        minSize: 1
      }
    });
  }
}

const app = new App();
new MyStack(app, "eks-cluster");
app.synth();
