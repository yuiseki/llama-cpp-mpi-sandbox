mpirun -host localhost -n 1 hostname
mpirun -host 192.168.10.1 -n 1 hostname
mpirun -host yu-pi-main.local -n 1 hostname
mpirun -host yu-pi-main-2.local -n 1 hostname
mpirun -hostfile ./hostfile -n 2 -v echo "hello world"
