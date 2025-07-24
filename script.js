const SHEET_URL = "https://script.google.com/macros/s/AKfycbxUbA-h2EZtfX7qvQUhoxAoqZ59IDG26hp6EfRgBNJuneStRktc7gbHn42S7JliryfQ/exec";
    const HUB_BALLOONS = {
      "HUB 01": "assets/logos/hubs 01__1080_x_1080_px___1_-removebg-preview.png",
      "HUB 02": "assets/logos/hubs 02__1080_x_1080_px___2_-removebg-preview.png",
      "HUB 03": "assets/logos/hubs 03__1080_x_1080_px___3_-removebg-preview.png",
      "HUB 04": "assets/logos/hubs 04__1080_x_1080_px___4_-removebg-preview.png",
      "HUB 05": "assets/logos/hubs 05__1080_x_1080_px___5_-removebg-preview.png",
      "HUB 06": "assets/logos/hubs 06__1080_x_1080_px___6_-removebg-preview.png",
      "HUB 07": "assets/logos/hubs 07__1080_x_1080_px___7_-removebg-preview.png",
      "HUB CTS": "assets/logos/hubs cts__1080_x_1080_px___12_-removebg-preview.png",
      "HUB IGT": "assets/logos/hubs igt__1080_x_1080_px___10_-removebg-preview.png",
      "HUB JDN": "assets/logos/hubs jdn__1080_x_1080_px___8_-removebg-preview.png",
      "HUB PHB": "assets/logos/hubs phb__1080_x_1080_px___17_-removebg-preview.png",
      "HUB QXD": "assets/logos/hubs qxd__1080_x_1080_px___11_-removebg-preview.png",
      "HUB SG": "assets/logos/hubs sg__1080_x_1080_px___13_-removebg-preview.png",
      "HUB SOBRAL": "assets/logos/hubs sbl__1080_x_1080_px___9_-removebg-preview.png",
      "HUB IMPERATRIZ": "assets/logos/hubs imp__1080_x_1080_px___18_-removebg-preview.png",
      "HUB CENTRAL MAPI": "assets/logos/hubs mapi__1080_x_1080_px___16_-removebg-preview.png",
      "THE 01": "assets/logos/hubs the01__1080_x_1080_px___14_-removebg-preview.png",
      "THE 02": "assets/logos/hubs the02__1080_x_1080_px___15_-removebg-preview.png",
    };

    async function fetchRanking() {
      try {
        const response = await fetch(SHEET_URL);
        const data = await response.json();
        
        const sorted = data.sort((a, b) => b["New Mas"] - a["New Mas"]);
        renderRanking(sorted);
        updateLastUpdated();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    function renderRanking(data) {
      const container = document.getElementById("ranking-list");
      container.innerHTML = "";

      data.forEach((item, index) => {
        const row = document.createElement("div");
        row.classList.add("consultor-row");

        const balloonImg = HUB_BALLOONS[item["HUB"]] 
            ? `<img src="${HUB_BALLOONS[item["HUB"]]}" alt="${item["HUB"]}" loading="lazy"/>` 
            : "";

        row.innerHTML = `
          <span>${index + 1}</span>
          <span class="consultor-info">${item["Consultor"]} ${balloonImg}</span>
          <span>${item["HUB"]}</span>
          <span><strong>${item["New Mas"]}</strong></span>
        `;

        container.appendChild(row);
      });
    }

    function updateLastUpdated() {
      const now = new Date();
      const options = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      document.getElementById('last-updated').textContent = 
        `Última atualização: ${now.toLocaleDateString('pt-BR', options)}`;
    }

    document.addEventListener("DOMContentLoaded", fetchRanking);
    
    // Atualizar a cada 5 minutos
    setInterval(fetchRanking, 5 * 60 * 1000);